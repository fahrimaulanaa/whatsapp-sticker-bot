async function getSahamVolume(ticker){
    try{
        const url = `https://exodus.stockbit.com/orderbook/companies/${ticker}`
        const bearer = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3MDc0NjI3LTg4MWItNDQzZC04OTcyLTdmMmMzOTNlMzYyOSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZSI6IkZhaHJpbWF1bCIsImVtYSI6ImZhaHJpbWF1bGFuYWExMjdAZ21haWwuY29tIiwiZnVsIjoiRmFocmkgTWF1bGFuYSIsInNlcyI6IjE3UkJtdjZoeXlLa2tHMFgiLCJkdmMiOiIiLCJ1aWQiOjE3NzU1MzJ9LCJleHAiOjE3MDg2Nzk1ODMsImlhdCI6MTcwODU5MzE4MywiaXNzIjoiU1RPQ0tCSVQiLCJqdGkiOiIxNjRmYjY5OC1kNTRkLTQzYTktYjU1MC02Nzk4NGQ2NTEwYzAiLCJuYmYiOjE3MDg1OTMxODN9.u7qDlRd3DS1zw_CdDnUkZ4krHqcp0yoFdFYRgkk9s1T82EzhhOKrirM-jAfztpguUKGi2i-cPTO2cahYaFf20gBYu9GwaMeRd5XNaeuXLwWAkpNqPmH_ZNx7zkUSqrkfj3OR2YVN-vXwuTJGatIGkT_weNzkEVUqV5QFuFSOXMmlLHhvN5_pPFSI8NKYEQFYW1aZjauEgEmfTCs0IajNRSX31khLllz6HcjhnzLfsK00BzAd87qK8J7yhjIugFzW4MgkY5jyxKN9RYEFq2-KxJcPJpTRrcCUawt5rxYPVOwF9dcZ59EKaP3DsjeHA6YSBXyK62CEAD9rOY5rZWgf_Q"
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": bearer
            }
        });
        const data = await response.json();
        const volume = data.data.volume
        return volume;

    }catch(error){
        console.error(error);
        return "An error occurred";
    }
}

module.exports = {getSahamVolume}