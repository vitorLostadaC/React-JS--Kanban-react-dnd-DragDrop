export function loadLists() {
  return [
    {
      title: "Pendente",
      createTable: true,
      cards: [
        {
          id: 1,
          title: "Ligar para mãe do Pedro",

          description: "Avisar sobre o preço do curso de costura.",
          color: "#0000FF",
          users: [
            {
              img: "https://images-apilist-fun.sfo2.cdn.digitaloceanspaces.com/adorable_avatars_api.png",
            },
            {
              img: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1485665415623x323958275606855740%2FAA_icon.png?w=&h=&auto=compress&dpr=1&fit=max",
            },
            {
              img: "https://i.pinimg.com/originals/e3/9c/cc/e39ccc946f7d7b929fef42bb82940468.png",
            },
            {
              img: "https://i.pinimg.com/originals/e3/9c/cc/e39ccc946f7d7b929fef42bb82940468.png",
            },
          ],
          date: "15/07/2021",
        },
        {
          id: 2,
          title: "Fazer os deveres",
          description: "Matemática página 13",
          color: "#0000FF",
          users: [
            {
              img: "https://i.pinimg.com/originals/e3/9c/cc/e39ccc946f7d7b929fef42bb82940468.png",
            },
          ],
          date: "10/06/2021",
        },
        {
          id: 3,
          title: "Fazer os deveres",
          description: "Matemática página 13",
          color: "#0000FF",
          users: [
            {
              img: "https://i.pinimg.com/originals/e3/9c/cc/e39ccc946f7d7b929fef42bb82940468.png",
            },
          ],
          date: "10/06/2021",
        },
      ],
    },
    {
      title: "Em andamento",
      createTable: false,
      cards: [
        {
          id: 5,
          title: "Limpar a casa",

          description: "Banheiro, Quartos e Cozinha",
          color: "#9400D3",
          users: [
            {
              img: "https://images-apilist-fun.sfo2.cdn.digitaloceanspaces.com/adorable_avatars_api.png",
            },
            {
              img: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1485665415623x323958275606855740%2FAA_icon.png?w=&h=&auto=compress&dpr=1&fit=max",
            },
          ],
          date: "06/05/2021",
        },
      ],
    },
    {
      title: "Concluido",
      createTable: false,
      cards: [
        {
          id: 9,
          title: "Limpar a casa",

          description: "Garagem",
          color: "#39FF14",
          users: [
            {
              img: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1485665415623x323958275606855740%2FAA_icon.png?w=&h=&auto=compress&dpr=1&fit=max",
            },
          ],
          date: "02/05/2021",
        },
        {
          id: 10,
          title: "Fazer os deveres",

          description: "Ingles e espanhol",
          color: "#39FF14",
          users: [
            {
              img: "https://images-apilist-fun.sfo2.cdn.digitaloceanspaces.com/adorable_avatars_api.png",
            },
          ],
          date: "09/06/2021",
        },
      ],
    },
  ];
}
