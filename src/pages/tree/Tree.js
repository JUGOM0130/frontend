let ARR = []

function getTreeDatas(data) {
    data.forEach(element => {
        if (element.child.length > 0) {
            getTreeDatas(element.child)
        }
        ARR.push({
            id: element.id,
            name: element.name
        });
    });
}

/*
let sample_data = [{
        id: 1,
        name: "askkrr",
        child: [{
                id: 2,
                name: "hkdeim",
                child: [{
                    id: 3,
                    name: "aigmzk",
                    child: []
                }]
            },
            {
                id: 4,
                name: "gimic",
                child: []
            }
        ]
    },
    {
        id: 11,
        name: "askkrrb",
        child: []
    }
]
*/
export function getTreeList(data) {
    ARR = []
    getTreeDatas(data)
    return ARR
}



export function treeDataAdd(id, treeObj, addData) {

    console.log(addData)
    treeObj.forEach(element => {
        if (element.id == id) {
            if (addData.id != "" && addData.name != "") {
                element.child.push(addData)
            }
        } else if (element.child.length > 0) {
            treeDataAdd(id, element.child, addData)
        }
    });
    return treeObj
}
