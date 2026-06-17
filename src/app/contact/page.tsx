import { useAppSelector } from "@/src/lib/store/hooks";

const Contact = () => {
  const name = useAppSelector((state) => state.studentSlice.name);
  return <div>{name}</div>;
};

export default Contact;
