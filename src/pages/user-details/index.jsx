import Button from "../../components/button";
import ContentHeader from "../../components/content-header";

export default function UserDetails(){
  return(
    <ContentHeader 
      title="Muhammad Irvan Hermawan"
      subtitle="Pecinta Kucing"
      actions={
        <Button>Edit Profile</Button>
      }
    />
  )
}