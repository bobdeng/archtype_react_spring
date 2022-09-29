import {render} from "@testing-library/react";
import {useState} from "react";
import {useMount} from "@/util/hook/use-mount";

function TestUseMount() {
  const [message, setMessage] = useState<string>('')
  useMount(() => {
    setMessage("Mounted")
  })
  return <div>
    {
      message && "Mounted"
    }
  </div>;
}

describe("use mount", () => {
  it('should call when node is mounted', function () {
    const {queryByText} = render(<TestUseMount/>)
    expect(queryByText("Mounted")).toBeInTheDocument()
  });
})