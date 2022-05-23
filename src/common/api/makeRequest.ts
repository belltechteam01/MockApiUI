export const makeRequest = async <R>(actionCreator: () => Promise<R>, cb?: (res: R) => void): Promise<R | undefined> => {
  try {
    const res = await actionCreator();
    cb && cb(res);
    return Promise.resolve(res);
  } catch (err) {
    console.error(err);
  }
};

export default makeRequest;
