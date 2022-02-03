export default function Testpage() {

  const test = [{name:'test', level:['test']},{name:'test2', level:['test2']}];
  return (
    <div className="App w-screen h-screen">
      {test.map(e => <div>{e.name}</div>)}
    </div>
  )
}