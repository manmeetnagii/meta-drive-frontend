import React, { useEffect, useState } from "react";

import "./scroll.css";



import {
  Bell,
  File,
  FileArchive,
  FileBadge2,
  Image,
  Menu,
  Music,
  Package2,
  Search,
  Video,
  ListFilter,
  Plus,
  Download,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

import logo from "../assets/logo.jpg";
import { logout } from "../firebase";
import axios from "axios";
import { url } from "../url";



const HomePage = () => {
  const [listFiles, setListFiles] = useState([]);
  const [file, setFile] = useState();

  const name = localStorage.getItem("name");

  useEffect(() => {
    const getFiles = async () => {
        const folderKey = localStorage.getItem("folderKey");

        const folderKeyParams = {
          folderKey: folderKey,
        };


        const resu = await axios.get(`${url}/listFiles`, {
                    params: folderKeyParams,
                  });

      
        setListFiles(resu.data.fileDetails.files.slice(1));
    };
    getFiles();
  }, []);

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
    try {
      const result = await axios.post(

        

        `${url}/upload`,

        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const download = async (file) => {
    const folderKey = localStorage.getItem("folderKey");

    try {
      const response = await axios.get(

        `${url}/download/${folderKey}/${file}`,

        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Download Error", error);
    }
  };

  const deleteFile = async (file) => {
    const folderKey = localStorage.getItem("folderKey");
    try {

      await axios.delete(`${url}/delete/${folderKey}/${file}`);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const openFile = async (file) => {
    const folderKey = localStorage.getItem("folderKey");
    try {
      const res = await axios.get(

        `${url}/openFile/${folderKey}/${file}`

      );

      window.open(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
 
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src={logo} alt="logo" className="w-[25px] rounded full" />
              <span className="text-2xl">
                Meta<span className="text-2xl text-blue-600">Drive</span>
              </span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="flex flex-col gap-5 px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image className="h-4 w-4" />
                Photos & images
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <File className="h-4 w-4" />
                Documents
              </Link>
              <Link
                to="/"
                className="flex bg-muted text-primary items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary"
              >
                <FileBadge2 className="h-4 w-4" />
                PDFs
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg  px-3 py-2  transition-all hover:text-primary"
              >
                <Video className="h-4 w-4" />
                Videos{" "}
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Music className="h-4 w-4" />
                Audio
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileArchive className="h-4 w-4" />
                Archives (zip)
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button
              size="sm"
              className=" text-[15px] w-full bg-blue-500"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src={logo} alt="logo" className="w-[25px] rounded full" />
              <span className="text-2xl">
                Meta<span className="text-2xl text-blue-600">Drive</span>
              </span>
            </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Image className="h-4 w-4" />
                  Photos & images
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <File className="h-4 w-4" />
                  Documents
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FileBadge2 className="h-4 w-4" />
                  PDFs
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Video className="h-4 w-4" />
                  Videos
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Music className="h-4 w-4" />
                  Audio
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FileArchive className="h-4 w-4" />
                  Archives (zip)
                </Link>
              </nav>
              <div className="mt-auto p-4">
                <Button
                  size="sm"
                  className=" text-[15px] w-full bg-blue-500"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img src={avatar} alt="avatar" className="rounded-full" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-lg font-semibold md:text-3xl">
              Welcome <span className="text-blue-500">{name}</span>
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  className="w-[3rem] h-[3rem] rounded-full"
                >
                  <span className="text-2xl text-gray-700">
                    <Plus />
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-[18px]">
                  <DialogTitle >Upload Files</DialogTitle>
                  <DialogDescription>
                    upload your files here. Click upload when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4 ">
                  <div className="grid w-full max-w-sm items-center gap-1.5 ">
                    <Label htmlFor="picture">Select File</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="*/*"
                      className="bg-blue-500 text-black border rounded hover:cursor-pointer"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <DialogFooter>
                    <button type="submit">Upload</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div
            className="relative overflow-hidden flex flex-1 items-center justify-center border-[2px] rounded-xl border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            {listFiles.length > 0 ? (
              <>
                <Tabs defaultValue="photos" className=" w-full h-full p-2">
                 
                  <div className=" flex items-center">
                    <TabsList>
                      <TabsTrigger value="photos" className="flex gap-2">
                        <Image className="h-4 w-4" />
                        Photos & images
                      </TabsTrigger>
                      <TabsTrigger value="documents" className="flex gap-2">
                        <File className="h-4 w-4" />
                        Documents
                      </TabsTrigger>
                      <TabsTrigger value="pdfs" className="flex gap-2">
                        <FileBadge2 className="h-4 w-4" />
                        PDFs
                      </TabsTrigger>
                      <TabsTrigger value="videos" className="flex gap-2">
                        <Video className="h-4 w-4" />
                        Videos
                      </TabsTrigger>
                      <TabsTrigger value="audio" className="flex gap-2">
                        <Music className="h-4 w-4" />
                        Audio
                      </TabsTrigger>
                      <TabsTrigger value="archives" className="flex gap-2">
                        <FileArchive className="h-4 w-4" />
                        Archives (zip)
                      </TabsTrigger>
                    </TabsList>
             
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-red-500">Upcoming</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1 text-sm"
                          >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">
                              Filter
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            Date
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Size
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Name
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <TabsContent value="photos" className="w-full h-full ">
                    <Card
                      x-chunk="dashboard-05-chunk-3 "
                      className="relative scroll-class overflow-hidden scrollbar-custom scroll-smooth overflow-y-scroll h-full "
                    >
                      <CardHeader className="px-7 ">
                        <CardTitle className="text-[25px]">Files</CardTitle>
                        <CardDescription className="text-[16px]">
                          Recent files from your store.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="absolute w-full">
                        <Table>
                          <TableHeader>
                            <TableRow className="text-[15px]">
                              <TableHead>File Name</TableHead>
                              <TableHead className="hidden sm:table-cell">
                                View File
                              </TableHead>
                              <TableHead className="hidden sm:table-cell">
                                Download File
                              </TableHead>

                              <TableHead className="hidden sm:table-cell">
                                Delete File
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {listFiles.map((file, index) => (
                              <TableRow className="bg-accent" key={index}>
                                <TableCell>
                                  <div
                                    className=" text-[18px]"
                                    onClick={() => {
                                      openFile(file);
                                    }}
                                  >
                                    {file}
                                  </div>
                                </TableCell>

                             
                                <TableCell className="hidden sm:table-cell">
                                  <Button
                                  variant="mybtn"
                                    onClick={() => {
                                      openFile(file);
                                    }}
                                    className="flex gap-2 items-center justify-center"
                                  >
                                    View                                   </Button>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Button variant="mybtn"
                                    onClick={() => {
                                      download(file);
                                    }}
                                    className="flex gap-2 items-center justify-center"
                                  >
                                    Download <Download className="w-[15px]"/>
                                  </Button>
                                </TableCell>
                               
                                <TableCell className="hidden sm:table-cell">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="mybtn2"  className="flex gap-2 items-center justify-center">Delete<Trash2 className="w-[15px]"/></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This
                                          will permanently delete your account
                                          and remove your data from our servers.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => {
                                            deleteFile(file);
                                          }}
                                        >
                                          Continue
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    You have no files
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can download, view & delete your files as soon as you
                    upload the files.
                  </p>
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
                          <Input
                            id="picture"
                            type="file"
                            accept="*/*"
                            className="bg-blue-500 text-black border rounded hover:cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>
                        <DialogFooter>
                          <button type="submit">Upload</button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
