import useSWR, { type SWRConfiguration } from 'swr';
import { type APIFetcherParams, getAPI } from './fetcher';

const swrOptions: SWRConfiguration = {
  shouldRetryOnError: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
  revalidateIfStale: true,
};

type UseGetApiParams = APIFetcherParams & {
  isReady?: boolean;
};

/**
 * automatic / immediate GET without trigger
 */
export const useGetAPI = <ResDataType>({
  path,
  config,
  isReady = true,
}: UseGetApiParams) => {
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    isReady ? [path, config] : null,
    ([path, config]) => getAPI<ResDataType>({ path, config }),
    swrOptions,
  );

  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
