export {};

declare global {
  interface Window {
    electronAPI: {
      fetchTogglData: (config: {
        apiToken: string;
        workspaceId: string;
        startDate: string;
        endDate: string;
      }) => Promise<{ success: boolean; filename?: string; count?: number; error?: string }>;

      readTable: () => Promise<any>;
    };
  }
}
