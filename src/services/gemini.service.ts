import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

// FIX: Declare process to access environment variables, as per project setup.
declare const process: any;

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly genAI!: GoogleGenAI;
  readonly chat = signal<Chat | null>(null);

  constructor() {
    // CRITICAL: The API key must be obtained from `process.env.API_KEY`.
    // Do not prompt the user for it.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      // The app will show error messages if the API is used without a key.
      return;
    }
    this.genAI = new GoogleGenAI({ apiKey });
  }

  startChat(): Chat {
    if (!this.genAI) {
        throw new Error('Gemini AI not initialized. Missing API Key.');
    }
    const newChat = this.genAI.chats.create({
      model: 'gemini-2.5-flash',
      history: [],
    });
    this.chat.set(newChat);
    return newChat;
  }

  async streamChat(prompt: string): Promise<AsyncGenerator<GenerateContentResponse>> {
    if (!this.genAI) {
        throw new Error('Gemini AI not initialized. Missing API Key.');
    }
    let currentChat = this.chat();
    if (!currentChat) {
      currentChat = this.startChat();
    }
    return currentChat.sendMessageStream({ message: prompt });
  }
  
  async generateImage(prompt: string): Promise<string> {
    if (!this.genAI) {
      console.error('Gemini AI not initialized. Missing API Key.');
      return 'error';
    }
    try {
      const response = await this.genAI.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });

      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
      console.error('Error generating image:', error);
      return 'error';
    }
  }
}
