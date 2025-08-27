<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const route = useRoute();
const router = useRouter();

const authentication = useAuthenticationStore();

onMounted(async () => {

    const error = route.query.error;
    const userId = route.query.user_id;
    
    if(error || !userId) {// error 스트링이있거나 userId가 쿼리 스트링에 없으면 sign-in으로 이동 함
        if(error) {
            alert(error);
        }
        await router.push('/sign-in'); // sign-in으로 라우팅
    }
    // error 스트링이 없었고 userId가 있으면 
    const nickName = route.query.nick_name;
    const pic = route.query.pic;

    const signedUser = { userId, nickName, pic };

    console.log('signedUser: ', signedUser);

    authentication.setSignedUser(signedUser); //로그인 처리 하고
    await router.push('/'); // 루트로 라우팅
})
</script>

<template>
    <div>
        <h1>소셜 로그인 처리 중...</h1>
    </div>
</template>

<style scoped>

</style>