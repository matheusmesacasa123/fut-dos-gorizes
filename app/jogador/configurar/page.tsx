"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function ConfigurarJogador() {


  const router = useRouter();


  const [jogadorId, setJogadorId] = useState<number | null>(null);


  const [chute, setChute] = useState(0);
  const [passe, setPasse] = useState(0);
  const [drible, setDrible] = useState(0);
  const [marcacao, setMarcacao] = useState(0);
  const [fisico, setFisico] = useState(0);


  const [posicao, setPosicao] = useState("");
  const [posicaoSecundaria, setPosicaoSecundaria] = useState("");


  const [fotoUrl, setFotoUrl] = useState("");
  const [arquivoFoto, setArquivoFoto] = useState<File | null>(null);


  const [loading, setLoading] = useState(true);




  function calcularOverall() {


    switch(posicao){


      case "CA":

        return Math.round(
          (chute * 0.40) +
          (drible * 0.25) +
          (passe * 0.15) +
          (fisico * 0.15) +
          (marcacao * 0.05)
        );



      case "MC":

        return Math.round(
          (passe * 0.35) +
          (drible * 0.25) +
          (chute * 0.20) +
          (fisico * 0.10) +
          (marcacao * 0.10)
        );



      case "ZAG":

        return Math.round(
          (marcacao * 0.45) +
          (fisico * 0.30) +
          (passe * 0.10) +
          (drible * 0.10) +
          (chute * 0.05)
        );



      case "LE":
      case "LD":

        return Math.round(
          (fisico * 0.25) +
          (marcacao * 0.25) +
          (passe * 0.20) +
          (drible * 0.20) +
          (chute * 0.10)
        );



      case "GOL":

        return Math.round(
          (marcacao * 0.35) +
          (fisico * 0.30) +
          (passe * 0.20) +
          (drible * 0.10) +
          (chute * 0.05)
        );



      default:

        return Math.round(
          (
            chute +
            passe +
            drible +
            marcacao +
            fisico
          ) / 5
        );


    }


  }



  const overall = calcularOverall();






  useEffect(() => {


    async function carregarJogador() {


      const { data } = await supabase.auth.getUser();



      if (!data.user) {

        router.push("/login");

        return;

      }



      const { data: jogador } = await supabase
        .from("jogadores")
        .select("*")
        .eq(
          "usuario_id",
          data.user.id
        )
        .single();



      if (jogador) {


        setJogadorId(jogador.id);


        setChute(jogador.chute ?? 0);
        setPasse(jogador.passe ?? 0);
        setDrible(jogador.drible ?? 0);
        setMarcacao(jogador.marcacao ?? 0);
        setFisico(jogador.fisico ?? 0);


        setPosicao(
          jogador.posicao ?? ""
        );


        setPosicaoSecundaria(
          jogador.posicao_secundaria ?? ""
        );


        setFotoUrl(
          jogador.foto_url ?? ""
        );


      }


      setLoading(false);


    }


    carregarJogador();


  }, [router]);






  async function uploadFoto() {


    if(!arquivoFoto) {

      return fotoUrl;

    }



    const extensao = arquivoFoto.name.split(".").pop();



    const nomeArquivo =
      `${Date.now()}.${extensao}`;



    const { error } = await supabase.storage
      .from("jogadores")
      .upload(
        nomeArquivo,
        arquivoFoto
      );



    if(error){

      alert(
        "Erro ao enviar foto: " + error.message
      );

      return fotoUrl;

    }




    const { data } =
      supabase.storage
      .from("jogadores")
      .getPublicUrl(nomeArquivo);



    return data.publicUrl;


  }
    async function salvar() {


    if (!jogadorId) return;



    const novaFotoUrl = await uploadFoto();



    const { error } = await supabase
      .from("jogadores")
      .update({

        chute,
        passe,
        drible,
        marcacao,
        fisico,

        posicao,

        posicao_secundaria:
          posicaoSecundaria,

        overall,

        foto_url:
          novaFotoUrl,

      })
      .eq(
        "id",
        jogadorId
      );



    if(error){

      alert(error.message);

      return;

    }



    alert(
      `Jogador atualizado! Overall: ${overall}`
    );


    router.push("/");


  }







  if(loading){

    return (
      <main className="p-8">
        Carregando...
      </main>
    )

  }







  return (

    <main className="min-h-screen bg-zinc-100 p-8 flex justify-center">


      <Card className="w-full max-w-xl p-8">


        <h1 className="text-3xl font-bold mb-6">
          ⚽ Configurar Jogador
        </h1>




        <div className="flex flex-col items-center mb-6">


          {
            fotoUrl
            ?

            <img

              src={fotoUrl}

              alt="Foto do jogador"

              className="
                w-32
                h-32
                rounded-full
                object-cover
                mb-4
              "

            />

            :

            <div

              className="
                w-32
                h-32
                rounded-full
                bg-zinc-300
                flex
                items-center
                justify-center
                text-4xl
                mb-4
              "

            >

              👤

            </div>

          }




<label
  className="
    cursor-pointer
    bg-zinc-200
    hover:bg-zinc-300
    rounded-lg
    px-4
    py-2
    font-semibold
    transition
  "
>

  📷 Escolher arquivo


  <input

    type="file"

    accept="image/*"

    className="hidden"

    onChange={(e)=>{

      const arquivo =
        e.target.files?.[0];


      if(arquivo){

        setArquivoFoto(arquivo);


        setFotoUrl(
          URL.createObjectURL(arquivo)
        );

      }

    }}

  />


</label>


        </div>





        <div className="bg-green-700 text-white rounded-lg p-4 mb-6 text-center">

          <p className="text-sm">
            Overall
          </p>

          <p className="text-5xl font-bold">
            {overall}
          </p>

        </div>





        <div className="space-y-4">



          <div>
            <label className="font-semibold">
              ⚽ Chute
            </label>

            <Input
              type="number"
              value={chute}
              onChange={(e)=>
                setChute(Number(e.target.value))
              }
            />
          </div>




          <div>
            <label className="font-semibold">
              🎯 Passe
            </label>

            <Input
              type="number"
              value={passe}
              onChange={(e)=>
                setPasse(Number(e.target.value))
              }
            />
          </div>




          <div>
            <label className="font-semibold">
              🔥 Drible
            </label>

            <Input
              type="number"
              value={drible}
              onChange={(e)=>
                setDrible(Number(e.target.value))
              }
            />
          </div>




          <div>
            <label className="font-semibold">
              🛡️ Marcação
            </label>

            <Input
              type="number"
              value={marcacao}
              onChange={(e)=>
                setMarcacao(Number(e.target.value))
              }
            />
          </div>




          <div>
            <label className="font-semibold">
              💪 Físico
            </label>

            <Input
              type="number"
              value={fisico}
              onChange={(e)=>
                setFisico(Number(e.target.value))
              }
            />
          </div>





          <select
            className="border rounded-md p-2 w-full"
            value={posicao}
            onChange={(e) =>
              setPosicao(e.target.value)
            }
          >

            <option value="">
              Escolha a posição principal
            </option>

            <option value="GOL">
              🧤 Goleiro
            </option>

            <option value="ZAG">
              🛡️ Zagueiro
            </option>

            <option value="LE">
              🏃 Lateral Esquerdo
            </option>

            <option value="LD">
              🏃 Lateral Direito
            </option>

            <option value="MC">
              🎯 Meio Campo
            </option>

            <option value="CA">
              ⚽ Centroavante
            </option>

          </select>






          <select
            className="border rounded-md p-2 w-full"
            value={posicaoSecundaria}
            onChange={(e) =>
              setPosicaoSecundaria(e.target.value)
            }
          >

            <option value="">
              Escolha a posição secundária
            </option>

            <option value="GOL">
              🧤 Goleiro
            </option>

            <option value="ZAG">
              🛡️ Zagueiro
            </option>

            <option value="LE">
              🏃 Lateral Esquerdo
            </option>

            <option value="LD">
              🏃 Lateral Direito
            </option>

            <option value="MC">
              🎯 Meio Campo
            </option>

            <option value="CA">
              ⚽ Centroavante
            </option>

          </select>






          <Button
            className="w-full cursor-pointer"
            onClick={salvar}
          >
            💾 Salvar Jogador
          </Button>




        </div>


      </Card>


    </main>

  );

}