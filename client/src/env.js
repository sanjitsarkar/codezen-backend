let hostUrl="http://localhost:5000/api";
if(hostUrl===undefined)
{
    hostUrl = process.env.VITE_HOST_URL
}
else{
    hostUrl+="/"
}
export default hostUrl