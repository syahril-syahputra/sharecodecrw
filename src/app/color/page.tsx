import React from 'react';

export default function page() {
    return (
        <div className="grid grid-cols-4 gap-8 space-y-4 p-4">
            <div>
                <h1>Ring</h1>
                <div className="border border-black bg-ring py-4"></div>
            </div>
            <div>
                <h1>Input</h1>
                <div className="border border-black bg-input py-4"></div>
            </div>
            <div>
                <h1>Border</h1>
                <div className="border border-black bg-border py-4"></div>
            </div>
            <div>
                <h1>background</h1>
                <div className="border border-black bg-background py-4"></div>
            </div>
            <div>
                <h1>foreground</h1>
                <div className="border border-black bg-foreground py-4"></div>
            </div>
            <div>
                <h1>Primary</h1>
                <div className="border border-black bg-primary py-4"></div>
                <div className="border border-black bg-primary-foreground py-4"></div>
            </div>
            <div>
                <h1>Secondary</h1>
                <div className="border border-black bg-secondary py-4"></div>
                <div className="border border-black bg-secondary-foreground py-4"></div>
            </div>
            <div>
                <h1>Destructive</h1>
                <div className="border border-black bg-destructive py-4"></div>
                <div className="border border-black bg-destructive-foreground py-4"></div>
            </div>
            <div>
                <h1>Muted</h1>
                <div className="border border-black bg-muted py-4"></div>
                <div className="border border-black bg-muted-foreground py-4"></div>
            </div>
            <div>
                <h1>accent</h1>
                <div className="border border-black bg-accent py-4"></div>
                <div className="border border-black bg-accent-foreground py-4"></div>
            </div>
            <div>
                <h1>popover</h1>
                <div className="border border-black bg-popover py-4"></div>
                <div className="border border-black bg-popover-foreground py-4"></div>
            </div>
            <div>
                <h1>card</h1>
                <div className="border border-black bg-card py-4"></div>
                <div className="border border-black bg-card-foreground py-4"></div>
            </div>
        </div>
    );
}
