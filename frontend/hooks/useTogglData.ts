import { useQuery } from "@tanstack/react-query";

const fetchTogglData = async () => {
  if (!window?.electronAPI) {
    throw new Error("electronAPI is not available");
  }

  // 1. Fetch & save to table.json
  await window.electronAPI.fetchTogglData({
    apiToken: "473913e652b123f0e668832dd1311b63",
    workspaceId: "123456",
    startDate: "2025-08-01",
    endDate: "2025-08-21",
  });

  // 2. Read from table.json
  return await window.electronAPI.readTable();
};

export const useTogglData = () => {
  return useQuery({
    queryKey: ["togglData"],
    queryFn: fetchTogglData,
    refetchInterval: 60 * 60 * 1000, // Every hour
    refetchOnWindowFocus: true,
    enabled: typeof window !== "undefined" && !!window.electronAPI, // only run on client
  });
};
