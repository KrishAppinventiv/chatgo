// const login = async (payload: any) => {
//     const res = await API.post(`${USER_SERVICE}/user/login`, { ...payload });

//     const { data } = res;
//     if (data.code !== 200) {
//       const { code, message } = data;
//       Logger.debug(code, message, data);
//       throw new AppError(message, code, data);
//     }
//     showSuccessToast({
//       label: t('success'),
//       description: t('loginSuccessfully'),
//     });

//     return res.data.data;
//   };
