import { useCallback, useEffect, useState, useMemo } from 'react'
import { FullFileBrowser } from 'chonky'
import {
  FileArray,
  ChonkyFileActionData,
  ChonkyActions,
} from 'chonky'
import { enqueueSnackbar } from 'notistack'

type BackendData = { [key: string]: string[] }

const useFileActionHandler = (setCurrFolder: (curr: string) => void, setCurrFile: (curr: string) => void, setCurrRadioFolder: (curr: string) => void) => {
  return useCallback((data: ChonkyFileActionData) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { targetFile, files } = data.payload
      const file = targetFile ?? files[0]
      if (file) {
        if (file.isDir) {
          setCurrFile('')
          setCurrFolder(file.id)
          setCurrRadioFolder(file.id)
          return
        }
        else {
          setCurrFile(file.id)
        }
      }
    }
  }, [setCurrFolder])
}

const useFiles = (currFolder: string, data: BackendData): FileArray => {
  return useMemo<FileArray>(() => {
    if (Object.keys(data).includes(currFolder)) {
      return data[currFolder].map(file => ({ id: file, name: file }))
    }
    if (currFolder === 'Radio') {
      return Object.keys(data).map(folder => ({ id: folder, name: folder, isDir: true }))
    }
    return []
  }, [currFolder, data])
}

const useFolderChain = (currFolder: string, data: BackendData): FileArray => {
  return useMemo<FileArray>(() => {
    const chain = [{ id: 'Radio', name: 'Radio', isDir: true }]
    if (Object.keys(data).includes(currFolder))
      chain.push({ id: currFolder, name: currFolder, isDir: true })
    return chain
  }, [currFolder, data])
}

interface Props {
  setCurrFile: (curr: string) => void,
  setLogin: (state: boolean) => void,
  setCurrRadioFolder: (curr: string) => void,
}
export default function Component(props: Props) {
  const { setCurrFile, setLogin, setCurrRadioFolder } = props
  const [data, setData] = useState<BackendData>({})
  const [currFolder, setCurrFolder] = useState('Radio')
  const files = useFiles(currFolder, data)
  const folderChain = useFolderChain(currFolder, data)
  const handleFileAction = useFileActionHandler(setCurrFolder, setCurrFile, setCurrRadioFolder)
  useEffect(() => {
    async function fetchFiles(): Promise<void> {
      const token = sessionStorage.getItem('token')
      if (token === null) {
        enqueueSnackbar('Login required', { variant: 'error' })
        setLogin(false)
        return
      }
      try {
        const res = await fetch('https://api.radio.nickchen120235.dev/', {
          headers: {
            'Authorization': token
          }
        })
        if (res.ok) {
          const data = await res.json() as BackendData
          setData(data)
        }
        else {
          if (res.status === 401) {
            const data = await res.json() as { error: string }
            enqueueSnackbar(data.error, { variant: 'error' })
            setLogin(false)
          }
          else {
            enqueueSnackbar(`Backend returned ${res.status}`, { variant: 'error' })
            setLogin(false)
          }
        }
      }
      catch (e) {
        console.error(e)
        enqueueSnackbar('Failed to fetch files', { variant: 'error' })
      }
    }
    fetchFiles()
  }, [])
  return <FullFileBrowser files={files} folderChain={folderChain} onFileAction={handleFileAction} />
}
