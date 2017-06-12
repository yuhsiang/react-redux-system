let id = 0;
const TYPE_GROUP = 'group';
const TYPE_ITEM = 'item';
const groupItems = {
  createGroupItem: (data) => {
    const { id, type, name } = data;
    // check id,type,name...
    return new GroupItems({id, type, name});
  },
  genNextId: () => {
    id++;
    return id;
  },
  getGroupType: () => TYPE_GROUP,
  getItemType: () => TYPE_ITEM,
}

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
    this.item.push(item);
  }
}

export default groupItems;
