export class Global{
    public static EMAIL_REGEX:any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_#{}+":;'\[\]~`()/])[A-Za-z\d$@$!%*?&_#{}+":;'\[\]~`()/]{8,}/;
    public static MOBILE_REGEX:any = /^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$/;
    public static PASSWORD_REGEX:any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_#{}+":;'\[\]~`()/])[A-Za-z\d$@$!%*?&_#{}+":;'\[\]~`()/]{8,}/;
    public static apiUrl = "http://localhost:8080/WSDemo/user";
    constructor(){
    }
}