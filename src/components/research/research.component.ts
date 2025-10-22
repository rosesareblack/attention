import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchDocument, ResearchFile, ResearchFolder } from '../../models';
import { DATA } from './research.data';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <!-- Sidebar -->
      <aside class="w-1/3 md:w-1/4 lg:w-1/5 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Research Library</h2>
        <nav>
          <ul>
            @for (doc of documents(); track doc.id) {
              <li>
                @if (doc.type === 'folder') {
                  <div (click)="toggleFolder(doc)" class="cursor-pointer flex items-center justify-between p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-500 dark:text-slate-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 4.5 3.75h15A2.25 2.25 0 0 1 21.75 6v3.776" />
                      </svg>
                      <span class="font-medium text-slate-700 dark:text-slate-300">{{ doc.title }}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transition-transform text-slate-400" [class.rotate-90]="doc.isOpen()">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  @if (doc.isOpen()) {
                    <ul class="pl-4 border-l border-slate-200 dark:border-slate-700 ml-2.5">
                      @for (child of doc.children; track child.id) {
                        <li (click)="selectDocument(child)" 
                            [class.bg-blue-50]="selectedDocument()?.id === child.id"
                            [class.dark:bg-blue-500/10]="selectedDocument()?.id === child.id"
                            class="flex items-center gap-2 p-2 my-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-slate-400">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                           </svg>
                          <span [class.text-blue-600]="selectedDocument()?.id === child.id" [class.dark:text-blue-400]="selectedDocument()?.id === child.id"
                                [class.font-semibold]="selectedDocument()?.id === child.id">{{ child.title }}</span>
                        </li>
                      }
                    </ul>
                  }
                }
              </li>
            }
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="w-2/3 md:w-3/4 lg:w-4/5 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        @if (selectedDocument(); as doc) {
          @if (doc.type === 'file') {
            <article class="prose prose-slate dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-slate-800 dark:prose-h2:text-slate-100" [innerHTML]="doc.content"></article>
          }
        } @else {
          <div class="flex items-center justify-center h-full text-slate-500">
            <p>Select a document to read.</p>
          </div>
        }
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchComponent {
  documents = signal<ResearchFolder[]>(DATA);
  selectedDocument = signal<ResearchFile | null>(null);

  constructor() {
    // Open the first folder and select the first file by default
    const firstFolder = this.documents()[0];
    if (firstFolder?.type === 'folder' && firstFolder.children.length > 0) {
      const firstFile = firstFolder.children[0];
      if (firstFile.type === 'file') {
        this.selectDocument(firstFile);
        if (firstFolder.isOpen) {
            firstFolder.isOpen.set(true);
        }
      }
    }
  }

  toggleFolder(folder: ResearchFolder): void {
    folder.isOpen.update(open => !open);
  }

  selectDocument(doc: ResearchDocument): void {
    if (doc.type === 'file') {
      this.selectedDocument.set(doc);
    }
  }
}
