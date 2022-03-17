class User{
    constructor(id, name, email) {
        if (new.target === User) {
            throw new Error("Can't instantiate abstract class!");
        }
        this._id = id;
        this._name = name;
        this._email = email;
    }

    get id(){return this._id}
    set id(val){this._id = val}

    get name(){return this._name}
    set name(val){this._name = val}

    get email(){return this._email}
    set email(val){this._email = val}

    info(){
        return `Name: ${this.name}; Id: ${this.id}; Email: ${this.email}`
    }
}

class PremiumUser extends User{
    constructor(id, name, email, groups, pages) {
        super(id, name, email);
        this._pages = pages;
        this._groups = groups;
    }

    get pages(){return this._pages}
    set pages(val){this._pages = val}

    get groups(){return this._groups}
    set groups(val){this._groups = val}

    info() {
        return super.info()+`; My Pages: ${this.pages.length}; My Groups: ${this.groups.length}`;
    }
}

const user = new PremiumUser(87456, 'Nazar Viznytsya', 'viz.nazar@gmail.com',
    ['PTEC Kids', 'Shaftesbury Kids', 'Pen Supremacy Group'],
    ["Nazar's High Tech Fixing Business", "Nazar's Calculator Resell"]);