export class UserDTO {
    SessionUserID?: number;
    UserName: string;
    UserPassword: string;
    Deleted: boolean;
    Statu: boolean;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.UserName = data.UserName || '';
        this.UserPassword = data.UserPassword || '';
        this.Deleted = data.Deleted ?? false;
        this.Statu = data.Statu ?? true;
    }
}



export class UserByIDDTO {
    SessionUserID?: number;

    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)

    }
}

