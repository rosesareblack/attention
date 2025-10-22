
import { signal } from '@angular/core';
import { ResearchFolder } from '../../models';

// FIX: Provide valid mock data for the research library.
export const DATA: ResearchFolder[] = [
  {
    id: 'folder-1',
    type: 'folder',
    title: 'Understanding ADHD',
    isOpen: signal(true),
    children: [
      {
        id: 'file-1-1',
        type: 'file',
        title: 'What is ADHD?',
        content: `
          <h2 class="text-2xl font-bold mb-4">What is Attention-Deficit/Hyperactivity Disorder (ADHD)?</h2>
          <p class="mb-4">ADHD is a neurodevelopmental disorder that affects both children and adults. It is characterized by persistent patterns of inattention, hyperactivity, and impulsivity that are more frequent and severe than is typically observed in individuals at a comparable level of development.</p>
          <h3 class="text-xl font-semibold mb-2">Key Symptoms:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Inattention:</strong> Difficulty sustaining attention, making careless mistakes, not seeming to listen, failing to finish tasks, difficulty with organization, and being easily distracted.</li>
            <li><strong>Hyperactivity-Impulsivity:</strong> Fidgeting, inability to stay seated, excessive running or climbing, talking excessively, interrupting others, and difficulty waiting for one's turn.</li>
          </ul>
        `
      },
      {
        id: 'file-1-2',
        type: 'file',
        title: 'Types of ADHD',
        content: `
          <h2 class="text-2xl font-bold mb-4">The Three Presentations of ADHD</h2>
          <p class="mb-4">ADHD is categorized into three primary types, or presentations:</p>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Predominantly Inattentive Presentation:</strong> Individuals have significant problems with inattention but exhibit less hyperactivity or impulsivity. They may be seen as "daydreamers."</li>
            <li><strong>Predominantly Hyperactive-Impulsive Presentation:</strong> Individuals show more symptoms of hyperactivity and impulsivity than inattention.</li>
            <li><strong>Combined Presentation:</strong> This is the most common type, where individuals have significant symptoms of both inattention and hyperactivity-impulsivity.</li>
          </ol>
        `
      },
      {
        id: 'file-1-3',
        type: 'file',
        title: 'Causes of ADHD',
        content: `
            <h2 class="text-2xl font-bold mb-4">What Causes ADHD?</h2>
            <p class="mb-4">While the exact causes of ADHD are not fully understood, research suggests that a combination of factors plays a role. It is primarily considered a brain-based, biological disorder.</p>
            <h3 class="text-xl font-semibold mb-2">Key Factors:</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Genetics:</strong> ADHD has a strong genetic component and often runs in families.</li>
                <li><strong>Brain Structure and Function:</strong> Studies have shown differences in the brain structure and neurotransmitter systems (especially those involving dopamine and norepinephrine) of individuals with ADHD.</li>
                <li><strong>Environmental Factors:</strong> Certain factors, such as premature birth, low birth weight, and exposure to environmental toxins during pregnancy or at a young age, may increase the risk.</li>
            </ul>
            <p class="mt-4 italic">It is important to note that ADHD is not caused by poor parenting, lack of discipline, or too much screen time, although these factors can influence the severity of symptoms.</p>
        `
      }
    ]
  },
  {
    id: 'folder-2',
    type: 'folder',
    title: 'Management Strategies',
    isOpen: signal(false),
    children: [
      {
        id: 'file-2-1',
        type: 'file',
        title: 'Behavioral Therapy',
        content: `
          <h2 class="text-2xl font-bold mb-4">Behavioral Therapy for ADHD</h2>
          <p class="mb-4">Behavioral therapy is a cornerstone of ADHD treatment. It focuses on teaching strategies to manage symptoms. Key components include:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Helps change negative thought patterns and develop coping mechanisms for challenges with executive functions like planning and emotional regulation.</li>
            <li><strong>Parent Training:</strong> Equips parents with tools to encourage positive behavior and manage challenging ones using positive reinforcement and structured routines.</li>
            <li><strong>Social Skills Training:</strong> Teaches individuals how to interact more effectively with peers, understand social cues, and build healthier relationships.</li>
          </ul>
        `
      },
      {
        id: 'file-2-2',
        type: 'file',
        title: 'Medication',
        content: `
          <h2 class="text-2xl font-bold mb-4">Medication for ADHD</h2>
          <p class="mb-4">Medication can be highly effective in managing core ADHD symptoms by helping to balance brain chemistry. The two main types are:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Stimulants:</strong> (e.g., methylphenidate, amphetamines) These are the most commonly prescribed medications and work by increasing levels of certain neurotransmitters (dopamine and norepinephrine) in the brain.</li>
            <li><strong>Non-Stimulants:</strong> (e.g., atomoxetine, guanfacine) These are used when stimulants are not effective or cause problematic side effects. They work differently than stimulants but can also improve attention and reduce impulsivity.</li>
          </ul>
          <p class="mt-4 italic">It's crucial to work with a qualified healthcare professional to determine the right medication, dosage, and treatment plan.</p>
        `
      }
    ]
  },
  {
    id: 'folder-3',
    type: 'folder',
    title: 'ADHD in Adults',
    isOpen: signal(false),
    children: [
        {
            id: 'file-3-1',
            type: 'file',
            title: 'Symptoms in Adults',
            content: `
                <h2 class="text-2xl font-bold mb-4">Recognizing ADHD in Adults</h2>
                <p class="mb-4">ADHD symptoms can manifest differently in adults than in children. Hyperactivity often becomes less overt and may present as a feeling of internal restlessness.</p>
                <h3 class="text-xl font-semibold mb-2">Common Adult Symptoms:</h3>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>Difficulty with executive functions:</strong> Chronic procrastination, trouble starting and finishing projects, and poor time management.</li>
                    <li><strong>Disorganization:</strong> Cluttered living/work spaces, frequently losing items, and difficulty keeping track of appointments.</li>
                    <li><strong>Emotional Dysregulation:</strong> Impulsivity, low frustration tolerance, frequent mood swings, and difficulty managing stress.</li>
                    <li><strong>Relationship and Career Challenges:</strong> Problems with maintaining relationships, frequent job changes, and underachievement at work.</li>
                </ul>
            `
        }
    ]
  }
];
