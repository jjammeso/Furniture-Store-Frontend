
export function getToken(){
    try{
        return localStorage.getItem('auth-token')
    }catch(err){
        return null
    }
}
