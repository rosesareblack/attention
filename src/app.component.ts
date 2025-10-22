import { Component, ChangeDetectionStrategy, signal, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SymptomCheckerComponent } from './components/symptom-checker/symptom-checker.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { ResearchComponent } from './components/research/research.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';

type View = 'home' | 'checker' | 'chat' | 'research' | 'image';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    SymptomCheckerComponent,
    AiChatComponent,
    ResearchComponent,
    ImageGeneratorComponent
  ],
  template: `
    <div class="flex h-screen w-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <!-- Sidebar Navigation -->
      <nav class="w-16 md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <svg class="w-8 h-8 text-blue-500 flex-shrink-0" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 8.25v7.5A2.25 2.25 0 0 0 6.75 18Z" />
            </svg>
            <h1 class="text-xl font-bold hidden md:block">Clarity Hub</h1>
        </div>

        <ul class="flex-1 p-2 space-y-1">
          @for(item of navItems; track item.id) {
            <li (click)="currentView.set(item.id)" 
                class="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors"
                [class.bg-blue-50]="currentView() === item.id"
                [class.dark:bg-blue-500/10]="currentView() === item.id"
                [class.font-semibold]="currentView() === item.id"
                [class.text-blue-600]="currentView() === item.id"
                [class.dark:text-blue-400]="currentView() === item.id"
                [class.hover:bg-slate-100]="currentView() !== item.id"
                [class.dark:hover:bg-slate-800]="currentView() !== item.id"
                >
              <svg class="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" [innerHTML]="getSafeIcon(item.icon)"></svg>
              <span class="hidden md:inline">{{ item.label }}</span>
            </li>
          }
        </ul>
        
        <div class="p-4 mt-auto border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span class="text-sm hidden md:inline">Theme</span>
            <app-theme-toggle></app-theme-toggle>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="flex-1 h-screen overflow-y-auto bg-slate-50 dark:bg-slate-900">
        @switch (currentView()) {
          @case ('home') {
             <div class="p-6 sm:p-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-2 text-slate-800 dark:text-slate-100">Welcome to ADHD Clarity Hub</h1>
                <p class="text-slate-600 dark:text-slate-400 mb-8">Your toolkit for understanding and managing ADHD.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for(item of navItems; track item.id) {
                        @if(item.id !== 'home') {
                            <div (click)="currentView.set(item.id)" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div class="flex items-center gap-4">
                                    <div class="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-full">
                                        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" [innerHTML]="getSafeIcon(item.icon)"></svg>
                                    </div>
                                    <div>
                                        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">{{ item.label }}</h2>
                                        <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.description }}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    }
                </div>
            </div>
          }
          @case ('checker') { <app-symptom-checker class="block h-full w-full"></app-symptom-checker> }
          @case ('chat') { <app-ai-chat class="block h-full w-full"></app-ai-chat> }
          @case ('research') { <app-research class="block h-full w-full"></app-research> }
          @case ('image') { <app-image-generator class="block h-full w-full"></app-image-generator> }
        }
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    .grok-bg {
        background: linear-gradient(45deg, #4285f4, #9b72cb);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private sanitizer = inject(DomSanitizer);
  currentView = signal<View>('home');
  
  navItems: { id: View, label: string, icon: string, description?: string }[] = [
    { id: 'home', label: 'Home', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />`, description: 'Start here' },
    { id: 'checker', label: 'Symptom Checker', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />`, description: 'Assess your symptoms with a guided quiz.' },
    { id: 'chat', label: 'AI Chat', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m3.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />`, description: 'Ask questions and get answers from an AI.' },
    { id: 'research', label: 'Research Library', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.05 0 4.01-.683 5.5-1.921l.5-.375 5.5 1.921V4.262c-.938-.332-1.948-.512-3-.512h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5m-6.75-6.375a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />`, description: 'Browse curated documents and studies.' },
    { id: 'image', label: 'Image Generator', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />`, description: 'Create visuals with the power of AI.' }
  ];

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
