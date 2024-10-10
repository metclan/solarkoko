import { Dialog, DialogFooter, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getEndPoint } from "@/utils/getEndPoint"
import { toast } from "@/hooks/use-toast"
type Address = {
    _id: string
    name: string
    street: string
    city: string
    state: string
    phone: string
    isDefault?: string
  }
  
type Props = {
    address : Address, 
}
export function AddressCard ( {address} : Props) {
    const [isDeletingAddress, setIsDeletingAddress] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const { data, mutate, isLoading } = useMutation({ 
        mutationKey: ["DELETE_ADDRESS"],
        mutationFn: async () => await fetch(`${getEndPoint()}/api/user`, { method: 'DELETE', body : JSON.stringify({ addressId : address._id})})
    })
    const handleDeleteAddress = () => {
        setIsDeletingAddress(true)
    }    
    function confirmDeleteAddress(){
        mutate()
    }
    useEffect(() => {
        if(data?.ok){
            setIsDeletingAddress(false); 
            toast({
                title : "Address deleted successfully",
                className : "bg-green-500"
            })
            queryClient.invalidateQueries({ queryKey : ["USER_ADDRESSES"]})
        }
    }, [isLoading, data, queryClient])
    return (
        <div key={address._id} className="flex items-center space-x-3 mb-4 p-4 bg-gray-50 rounded-md">
        <RadioGroupItem value={address._id} id={`address-${address._id}`} />
        <Label htmlFor={`address-${address._id}`} className="flex-grow">
            <div className="font-medium text-gray-900 text-lg">{address.name}</div>
            <div className="text-base text-gray-700">
            {address.street}, {address.city}, {address.state}
            </div>
            <div className="text-base text-gray-700">{address.phone}</div>
        </Label>
        <div className="flex space-x-2">
            <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2"
            asChild
            >
            <Link href={`/checkout/addresses/edit/${address._id}`}>
                Edit
            </Link>
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteAddress}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 font-medium px-4 py-2"
            >
            Delete
            </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeletingAddress} onOpenChange={() => setIsDeletingAddress(false)}>
            <DialogContent className="bg-white">
            <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p className="text-base text-gray-700">Are you sure you want to delete this address?</p>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeletingAddress(false)} disabled={isLoading}>
                Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteAddress} disabled={isLoading}>
                    Delete
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    )
}