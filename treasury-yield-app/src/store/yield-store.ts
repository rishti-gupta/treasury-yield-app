import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { YieldsApi } from "../api/yields";
import { type YieldEntry } from "../utils";

function useYields() {
  const [isFetchingYields, setIsFetchingYields] = useState(false);
  const [yields, setYields] = useState<YieldEntry[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    void fetchYields();
  }, []);

  const fetchYields = async () => {
    setIsFetchingYields(true);
    try {
      const data = await YieldsApi.getYieldsData();
      setYields(data ?? []);
      setError(undefined);
    } catch (e) {
      console.error("Error fetching yields:", e);
      setError("Failed to fetch yield data");
    } finally {
      setIsFetchingYields(false);
    }
  };

  return {
    isFetchingYields,
    yields,
    error,
    fetchYields,
  };
}

export const YieldsStore = createContainer(useYields);
