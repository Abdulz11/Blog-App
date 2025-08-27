'use client'

  

export default function error(e:unknown) {
  console.log(e)
  return (
    <div>
      <h2 style={{textAlign:'center'}}> An error occured </h2>
      {/* {e instanceof Error &&  'message' in e && <p>{e?.message}</p>}  */}
    </div>
  )
}
