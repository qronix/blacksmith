const UPGRADES = [
    {
        name:'Forge Level',
        description:'Items spawn at a higher level',
        rank:0,
        cost:10000,
        costDelta:5,
        effects:[0],
        active:false,
        icon:'/imgs/dag_01.png'
    },
    {
        name: 'Forge Speed',
        description: 'Forge generates items faster',
        rank:0,
        cost:500000,
        costDelta:4,
        effects:[1],
        active:false,
        icon:'/imgs/hm_t_02.png'
    },
    {
        name: 'Golden Anvil',
        description: 'Items are merged automatically',
        rank:0,
        cost:10000000,
        costDelta:5,
        effects:[2],
        active: false,
        icon:'/imgs/bl_t_01.png'
    }
];

export default UPGRADES;