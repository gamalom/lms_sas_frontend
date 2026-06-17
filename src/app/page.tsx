import { useAppDispatch } from "@/src/lib/store/hooks";
import { setName } from "../lib/store/studentSlice";

export default function Home() {
  const name = "manish";
  const dispatch = useAppDispatch();
  dispatch(setName(name));
  return <h1>hello</h1>;
}
