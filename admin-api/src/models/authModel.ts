export class UserRegisterDTO {
    NameSurname: string;
    Email: string;
    Password: string;
    RolID: number;
    constructor(data: any) {
        this.NameSurname = data.NameSurname || '';
        this.Email = data.Email || '';
        this.Password = data.Password || '';
        this.RolID = data.RolID || 0;
    }
}
export class UserLoginDTO {
    Email: string;
    Password: string;
    constructor(data: any) {
        this.Email = data.Email || null;
        this.Password = data.Password || null;
    }
}
export class UserMailConfirmDTO {
    Email: string;
    MailConfirmCode: string;
    constructor(data: any) {
        this.Email = data.Email || null;
        this.MailConfirmCode = data.MailConfirmCode || null;
    }
}

























export class UserUpdateDTO {
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
export class UserSelectDTO {
    SessionUserID: number;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
    }
}


export class FriendSendDTO {
    SessionUserID: number;
    FriendEmail: string;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.FriendEmail = data.FriendEmail || '';
    }
}
export class FriendAcceptDTO {
    SessionUserID: number;
    FriendUserID: number;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.FriendUserID = Number(data.FriendUserID)
    }
}
export class FriendStudiyingConfirmDTO {
    SessionUserID: number;
    FriendUserID: number;
    IsConfirm: boolean;
    IsRed: boolean;
    TargetUUID: string;
    ConfirmRedDesk: string;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.FriendUserID = Number(data.FriendUserID)
        this.IsConfirm = data.IsConfirm || false;
        this.IsRed = data.IsRed || false;
        this.TargetUUID = data.TargetUUID || '';
        this.ConfirmRedDesk = data.ConfirmRedDesk || '';
    }
}

export class FriendStudiyingSendDTO {
    SessionUserID: number;
    FriendEmail: string;
    FriendDescription: string;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.FriendEmail = data.FriendEmail;
        this.FriendDescription = data.FriendDescription
    }
}
export class FriendSelectDTO {
    SessionUserID: number;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
    }
}

export class FriendDetailSelectDTO {
    SessionUserID: number;
    FriendUserID: number;
    constructor(data: any) {
        this.SessionUserID = Number(data.SessionUserID)
        this.FriendUserID = Number(data.FriendUserID)

    }
}


