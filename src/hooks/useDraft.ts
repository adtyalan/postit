import useSWR from 'swr';

const DRAFT_KEY = 'pending_letter';

export function useDraft() {
  const { data, mutate } = useSWR(DRAFT_KEY, () => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const saveDraft = (draft: any) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    mutate(draft, false);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    mutate(null, false);
  };

  return {
    draft: data,
    saveDraft,
    clearDraft,
    isLoading: !data && data === undefined
  };
}
