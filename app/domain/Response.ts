export interface Response {
    "@programName": string;
    "@version":     string;
    "@generated":   string;
    site:           Site[];
}

export interface Site {
    "@name": string;
    "@host": string;
    "@port": string;
    "@ssl":  string;
    alerts:  Alert[];
}

export interface Alert {
    pluginid:   string;
    alertRef:   string;
    alert:      string;
    name:       string;
    riskcode:   string;
    confidence: string;
    riskdesc:   string;
    desc:       string;
    instances:  Instance[];
    count:      string;
    solution:   string;
    otherinfo:  string;
    reference:  string;
    cweid:      string;
    wascid:     string;
    sourceid:   string;
}

export interface Instance {
    uri:       string;
    method:    Method;
    param:     string;
    attack:    string;
    evidence:  string;
    otherinfo: string;
}

export enum Method {
    Get = "GET",
}
