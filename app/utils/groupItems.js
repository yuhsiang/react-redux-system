class GroupItems {
  constructor(data) {
    const { id, type, name } = data;
    this.id = id;
    this.type = type;
    this.name = name;
    this.isOpen = true;
    this.items = [];
  }

  setOpen() {
    this.isOpen = true;
  }
  setClose() {
    this.isOpen = false;
  }

  isGroup() {
    return this.type === TYPE_GROUP;
  }

  isItem() {
    return this.type !== TYPE_GROUP;
  }

  addItem(item) {
    if (!item instanceof GroupItems) {
      throw 'GroupItems type error';
    }
    this.items.push(item);
  }
}

let id = 1;
const TYPE_GROUP = 'group';
const TYPE_ITEM = 'item';
const groupItems = {
  createGroupItem,
  genNextId,
  getGroupType: () => TYPE_GROUP,
  getItemType: () => TYPE_ITEM,
  defaultGroup: getDefaultGroup(),
}

function genNextId(){
  id++;
  return id;
}

function createGroupItem(data){
  const { id, type, name } = data;
  // check id,type,name...
  return new GroupItems({id, type, name});
}

function getDefaultGroup() {
  let res = [];
  let groupItem = createGroupItem({
      id,
      type: TYPE_GROUP,
      name: '測試群組',
    });

  let secoundGroup = createGroupItem({
    id: genNextId(),
    type: TYPE_GROUP,
    name: 'Group2',
  });

  groupItem.addItem(secoundGroup);
  groupItem.addItem(createGroupItem({
    id: genNextId(),
    type: TYPE_ITEM,
    name: 'test1',
  }));
  groupItem.addItem(createGroupItem({
    id: genNextId(),
    type: TYPE_ITEM,
    name: 'test2',
  }));
  groupItem.addItem(createGroupItem({
    id: genNextId(),
    type: TYPE_ITEM,
    name: 'test3',
  }));
  secoundGroup.addItem(createGroupItem({
    id: genNextId(),
    type: TYPE_ITEM,
    name: 'Group2-item',
  }))

  return groupItem;
}



export default groupItems;
