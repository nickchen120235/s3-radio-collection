import Browser from './Browser'

export default function Component() {
  const setCurrFile = (curr: string) => {
    console.log(`Opening: ${JSON.stringify(curr)}`)
  }
  return (
    <div style={{ height: 300 }}>
      <Browser setCurrFile={setCurrFile} />
    </div>
  )
}
