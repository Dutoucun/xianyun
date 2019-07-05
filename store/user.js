export const state=()=>({
    userInfo:{
        token:'',
        user:{},
    }
})



export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data){
        state.userInfo = data;
    },
     // 清除用户数据
     cleanUserInfo(state, info){
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo = {};
    }
};

export const actions = {
    // 登录
    login({commit}, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit("setUserInfo", data);
        

          
            return data;
        })
    }
};