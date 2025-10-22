import { Component, ChangeDetectionStrategy, signal, inject, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { ChatMessage } from '../../models';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <header class="p-4 border-b border-slate-200 dark:border-slate-800">
        <h1 class="text-xl font-semibold">AI Assistant</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Ask me anything about ADHD</p>
      </header>
      
      <div #chatContainer class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
        @for (message of messages(); track message.id) {
          <div class="flex items-start gap-3 w-full" [class.justify-end]="message.role === 'user'">
            @if (message.role !== 'user') {
              <div class="grok-bg rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
            }
            <div class="max-w-xl p-3 rounded-lg break-words"
                 [class.bg-blue-600]="message.role === 'user'"
                 [class.text-white]="message.role === 'user'"
                 [class.bg-slate-100]="message.role !== 'user'"
                 [class.dark:bg-slate-800]="message.role !== 'user'"
                 [class.text-red-500]="message.role === 'error'"
                 [class.dark:text-red-400]="message.role === 'error'">
              <p>{{ message.text }}</p>
            </div>
             @if (message.role === 'user') {
               <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-300 font-semibold text-sm">YOU</div>
            }
          </div>
        }
        @if (loading()) {
          <div class="flex items-start gap-3">
            <div class="grok-bg rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
            </div>
            <div class="max-w-xl p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        }
      </div>

      <footer class="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <form (ngSubmit)="sendMessage()" class="flex items-center gap-2">
          <input [formControl]="chatInput"
                 type="text"
                 placeholder="Type your message..."
                 class="flex-1 p-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <button type="submit" [disabled]="loading() || chatInput.invalid"
                  class="p-2 rounded-md bg-blue-600 text-white font-semibold disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatComponent {
  geminiService = inject(GeminiService);
  messages = signal<ChatMessage[]>([
    { id: 0, role: 'model', text: 'Hello! I am an AI assistant. How can I help you today?' }
  ]);
  loading = signal(false);
  chatInput = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  private nextId = 1;
  
  chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  constructor() {
    this.geminiService.startChat();
    afterNextRender(() => {
        this.scrollToBottom();
    });
  }

  async sendMessage(): Promise<void> {
    if (this.chatInput.invalid || this.loading()) return;
    const userMessageText = this.chatInput.value;

    const userMessage: ChatMessage = { id: this.nextId++, role: 'user', text: userMessageText };
    this.messages.update(m => [...m, userMessage]);
    this.chatInput.reset();
    this.loading.set(true);
    this.scrollToBottom();

    try {
      const modelMessage: ChatMessage = { id: this.nextId++, role: 'model', text: '' };
      this.messages.update(m => [...m, modelMessage]);
      this.scrollToBottom();

      const stream = await this.geminiService.streamChat(userMessageText);
      for await (const chunk of stream) {
        this.messages.update(m => {
          const msg = m.find(msg => msg.id === modelMessage.id);
          if (msg) {
              msg.text += chunk.text;
          }
          return [...m];
        });
        this.scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.messages.update(m => [...m, { id: this.nextId++, role: 'error', text: 'Sorry, I encountered an error.' }]);
    } finally {
      this.loading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer()?.nativeElement;
    if (container) {
        setTimeout(() => container.scrollTop = container.scrollHeight, 0);
    }
  }
}
