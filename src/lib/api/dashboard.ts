import { createRequest } from '../request/create-request';

export const runAnalysisAction = async (input: { symbol: string; url: string }) => {
  try {
    const name = input.symbol.toLowerCase();
    const response = await createRequest(
      'GET',
      `/reports/project-overview?name=${name}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
    return response.data;
  } catch (error) {
    console.log('runAnalysisAction error', error);
  }
};

export const getProjectOverview = async (input: { symbol: string }) => {
  try {
    const name = input.symbol.toLowerCase();

    const response = await createRequest(
      'GET',
      `/reports/project-overview?name=${name}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
    return response.data;
  } catch (error) {
    console.log('getProjectOverview error occured:', error);
  }
};

export const getProjectSecurity = async (input: { symbol: string }) => {
  try {
    const name = input.symbol.toLowerCase();

    const response = await createRequest(
      'GET',
      `/reports/project-security?name=${name}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
    return response.data;
  } catch (error) {
    console.log('getProjectSecurity error occured:', error);
  }
};

export const getProjectDomain = async (input: { url: string }) => {
  try {
    const clean_query: any = extractDomain(input.url);
    const response = await createRequest(
      'GET',
      `/reports/domain?domain=${clean_query}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
    return response.data;
  } catch (error) {
    console.log('getProjectDomain error occured:', error);
  }
};

export const getProjectWebContent = async (input: { url: string }) => {
  try {
    const response = await createRequest(
      'GET',
      `/reports/web-analysis?url=${input.url}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
    return response.data;
  } catch (error) {
    console.log('getProjectWebContent error occured:', error);
  }
};

export const getProjectAdverseMediaContent = async (input: { tokenName: string }) => {
  try {
    const response = await createRequest(
      'GET',
      `/reports/adverse-media?tokenName=${input.tokenName}&tokenSymbol=${input.tokenName}`
    )({
      withoutAuth: false, // Include auth token if needed
    });
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
