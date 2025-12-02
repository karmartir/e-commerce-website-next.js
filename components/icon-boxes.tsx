import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
    return ( 
        <div>
            <Card className="bg-background/50 shadow-md border border-border/50">
                <CardContent className="grid md:grid-cols-4 gap-4 p-4 text-center md:text-left">
                    <div className="space-y-2 border-r pr-4 md:border-r md:pr-4">
                        <ShoppingBag className="mx-auto md:mx-0"/>
                        <div className='text-sm font-bold'>Free Shipping</div>
                        <div className="text-sm text-muted-foreground">
                            Free shipping on orders above $100
                        </div>
                    </div>
                    <div className="space-y-2 border-r pr-4 md:border-r md:pr-4">
                        <DollarSign className="mx-auto md:mx-0"/>
                        <div className='text-sm font-bold'>Money Back Guarantee</div>
                        <div className="text-sm text-muted-foreground">
                           Within 30 days of purchase
                        </div>
                    </div>
                    <div className="space-y-2 border-r pr-4 md:border-r md:pr-4">
                        <WalletCards className="mx-auto md:mx-0"/>
                        <div className='text-sm font-bold'>Flexible Payment</div>
                        <div className="text-sm text-muted-foreground">
                            Pay with credit card, PayPal or COD
                        </div>       
                    </div>
                    <div className="space-y-2">
                        <Headset className="mx-auto md:mx-0"/>
                        <div className='text-sm font-bold'>24/7 Support</div>
                        <div className="text-sm text-muted-foreground">
                            Get support at any time
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default IconBoxes;