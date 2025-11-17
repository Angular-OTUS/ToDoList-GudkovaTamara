import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import {
    MatDialogRef,
    MatDialog,
    MatDialogConfig,
} from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private current: MatDialogRef<any> | null = null;

    constructor(private router: Router, private dialog: MatDialog) {
        this.router.events.subscribe((e) => this.onRouterEvent(e));
    }

    openModalDialog<T, D, R>(
        component: ComponentType<T>,
        data: D
    ): Observable<R> {
        return this.dialog
            .open(component, { data: data })
            .afterClosed()
            .pipe(take(1));
    }

    openRightSideDialog<T, D, R>(
        component: ComponentType<T>,
        data: D
    ): Observable<R> {
        this.closeCurrentDialog();
        let config = this.createDialogConfig(data);
        this.current = this.dialog.open(component, config);
        return this.current.afterClosed().pipe(take(1));
    }

    closeCurrentDialog(): void {
        if (this.current) {
            this.current.close(null);
        }
    }

    open<T, D, R>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>
    ): Promise<R | undefined> {
        const observe = this.dialog
            .open<T, D, R>(componentOrTemplateRef, config)
            .afterClosed();
        return firstValueFrom(observe);
    }

    private createDialogConfig<D>(data: D): MatDialogConfig<D> {
        return {
            hasBackdrop: false,
            closeOnNavigation: true,
            position: { right: '0px', top: '64px', bottom: '0px' },
            height: 'calc(100% - 64px)',
            width: '400px',
            data: data,
        };
    }

    private onRouterEvent(e: any) {
        if (e instanceof NavigationEnd) {
            this.closeCurrentDialog();
        }
    }
}
