import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";


export async function createClient() {


console.log(
"URL SUPABASE:",
process.env.NEXT_PUBLIC_SUPABASE_URL
);


console.log(
"KEY EXISTE:",
!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



const cookieStore = await cookies();



return createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies: {

getAll(){

return cookieStore.getAll();

},

setAll(cookiesToSet){

try{

cookiesToSet.forEach(
({name,value,options})=>{

cookieStore.set(
name,
value,
options
);

}

);

}catch{}

}

}

}

);


}