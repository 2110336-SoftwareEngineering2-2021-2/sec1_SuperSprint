function MatchingResult({result}) {

  console.log(result);
  
  return (
    <h1>test</h1>
  )
}

export async function getServerSideProps(context) {
  const { result } = context.query;
  const queryResult = JSON.parse(result);
  console.log(queryResult);

  return {
    props: {
      result: queryResult
    }
  }
}

export default MatchingResult