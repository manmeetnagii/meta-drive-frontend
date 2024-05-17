import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Modal() {
    const [file, setFile] = useState();

    const submit = async (event) => {
        event.preventDefault();
    
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
    
        const folderKey = `user_${email}_${token}`;
    
        const data = {
          userId,
          folderKey,
        };
    
        const formData = new FormData();
    
        formData.append("file", file);
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
    
        await axios.post("http://localhost:3000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        window.location.reload();
      };
      
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Upload file</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            upload your files here. Click upload when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4 py-4 ">
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="picture">Select File</Label>
            <Input id="picture" type="file" accept="*/*" className="bg-blue-500 text-black border rounded hover:cursor-pointer" onChange={(e) => setFile(e.target.files[0])}/>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
