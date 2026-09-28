export type NewsTopic = 'ai' | 'devops';

export interface NewsSource {
  topic: NewsTopic;
  name: string;
  url: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  { topic: 'ai', name: 'OpenAI', url: 'https://openai.com/news/rss.xml' },
  { topic: 'ai', name: 'Google AI', url: 'https://blog.google/innovation-and-ai/technology/ai/rss/' },
  { topic: 'ai', name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml' },
  { topic: 'devops', name: 'Kubernetes', url: 'https://kubernetes.io/feed.xml' },
  { topic: 'devops', name: 'CNCF', url: 'https://www.cncf.io/blog/feed/' },
  { topic: 'devops', name: 'GitHub', url: 'https://github.blog/feed/' },
];
