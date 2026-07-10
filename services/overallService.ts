// Mínimo de avaliações para o overall poder evoluir
export const MIN_AVALIACOES_EVOLUCAO = 3;


export type OverallEvolution = {

  overallAntes: number;

  notaComunidade: number;

  diferencaNota: number;

  variacao: number;

  overallDepois: number;

  jogosAvaliados: number;

  podeEvoluir: boolean;

};





export function calculateOverallEvolution(

  overallAtual: number,

  notaComunidade: number,

  jogosAvaliados: number

): OverallEvolution {



  const diferencaNota =

    notaComunidade - overallAtual;





  // Peso que uma avaliação tem na evolução

  // 20% da diferença entre overall e nota

  const pesoEvolucao = 0.2;






  const variacao = Number(

    (

      diferencaNota *

      pesoEvolucao

    )

    .toFixed(1)

  );






  let overallDepois = Math.round(

    overallAtual + variacao

  );







  // Nunca ultrapassar 100

  if(overallDepois > 100){

    overallDepois = 100;

  }







  // Nunca ficar abaixo de 1

  if(overallDepois < 1){

    overallDepois = 1;

  }








  return {


    overallAntes: overallAtual,


    notaComunidade,


    diferencaNota,


    variacao,


    overallDepois,


    jogosAvaliados,


    podeEvoluir: jogosAvaliados >= MIN_AVALIACOES_EVOLUCAO,


  };


}