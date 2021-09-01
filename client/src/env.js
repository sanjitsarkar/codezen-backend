let hostUrl=undefined;
if(hostUrl===undefined)
{
    hostUrl = process.env.HOST_URL
}
else{
    hostUrl+="/"
}
export default hostUrl