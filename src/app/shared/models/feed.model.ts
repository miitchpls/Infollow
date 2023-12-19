export interface AttemptOptions {
  delay: number;
  factor: number;
  maxAttempts: number;
  minDelay: number;
  maxDelay: number;
  jitter: boolean;
}

export interface Feed {
  attemptOptions: AttemptOptions;
  order: string;
  query: string;
  enableGroups: boolean;
  includesHashtags: boolean;
  id: string;
  moreAvailable: boolean;
  nextMaxId: string;
}
