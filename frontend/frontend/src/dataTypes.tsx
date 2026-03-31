export interface PropertyListing {
    id: number,
    propertyType: string,
    propertyValue: number,
    propertyInfo: string,
    ownerContactnbr: string,
    propertyCity: string,
    propertyAction: string,
    moveInFlag: boolean,
}

export interface Response {
    ResponseMessage: string;
}          