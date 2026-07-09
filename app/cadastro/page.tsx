"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function Cadastro(){

const router = useRouter();

const [nome,setNome] = useState("");
const [email,setEmail] = useState("");
const [senha,setSenha] = useState("");



async function cadastrar(){


const {data,error} = await supabase.auth.signUp({

email,
password:senha

});


if(error){

alert(error.message);
return;

}



const usuarioId = data.user?.id;



if(usuarioId){


const {error:erroJogador}= await supabase
.from("jogadores")
.insert({

nome,
usuario_id:usuarioId

});


if(erroJogador){

alert(erroJogador.message);
return;

}


}



router.push("/");


}



return (

<div className="p-8 max-w-md mx-auto">


<h1 className="text-3xl font-bold mb-6">
Criar conta
</h1>


<input
className="border p-2 w-full mb-3"
placeholder="Nome"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>


<input
className="border p-2 w-full mb-3"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="border p-2 w-full mb-3"
placeholder="Senha"
type="password"
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>


<button
onClick={cadastrar}
className="bg-black text-white px-4 py-2 rounded"
>

Cadastrar

</button>


</div>

)

}