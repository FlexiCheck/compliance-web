import { createRequest } from '../request/create-request';

export const runAnalysisAction = async (input: { symbol: string; url: string }) => {
  try {
    console.log('run runAnalysisAction');
    const query = new URLSearchParams({ name: input.url });
    const response = await createRequest(
      'GET',
      '/reports/project-overview'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('runAnalysisAction completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('Something went wrong: runAnalysisAction', error);
  }
};

export const getProjectOverview = async (input: { url: string }) => {
  try {
    const query = new URLSearchParams({ name: input.url });
    const response = await createRequest(
      'GET',
      '/reports/project-overview'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('getProjectOverview completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('getProjectOverview error occured:', error);
  }
};

export const getProjectSecurity = async (input: { url: string }) => {
  try {
    const query = new URLSearchParams({ name: input.url });
    const response = await createRequest(
      'GET',
      '/reports/project-security'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('getProjectOverview completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('getProjectSecurity error occured:', error);
  }
};

export const getProjectDomain = async (input: { url: string }) => {
  try {
    const clean_query: any = extractDomain(input.url);
    console.log({ clean_query });

    const query = new URLSearchParams({ domain: clean_query });
    const response = await createRequest(
      'GET',
      '/reports/domain'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('getProjectOverview completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('getProjectSecurity error occured:', error);
  }
};

export const getProjectWebContent = async (input: { url: string }) => {
  console.log('getProjectWebContent', input);

  try {
    const query = new URLSearchParams({ url: input.url });
    const response = await createRequest(
      'GET',
      '/reports/web-analysis'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('getProjectWebContent completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('getProjectWebContent error occured:', error);
  }
};

export const getProjectAdverseMediaContent = async (input: { tokenName: string }) => {
  console.log('getProjectAdverseMediaContent', input);

  try {
    const query = new URLSearchParams({ tokenName: input.tokenName, tokenSymbol: input.tokenName });
    const response = await createRequest(
      'GET',
      '/reports/adverse-media'
    )({
      query, // Pass query parameters
      withoutAuth: false, // Include auth token if needed
    });
    console.log('getProjectAdverseMediaContent completed successfully:', response);
    return response.data;
  } catch (error) {
    console.log('getProjectAdverseMediaContent error occured:', error);
  }
};

function extractDomain(url: string) {
  const regex = /^(?:https?:\/\/)?([^/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
