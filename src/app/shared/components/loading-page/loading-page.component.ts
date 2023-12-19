import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingPageService } from './loading-page.service';

@Component({
  selector: 'loading-page',
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkPortal) portal: CdkPortal | undefined;
  public overlayRef: OverlayRef | undefined;
  private _viewInitialized: boolean = false;
  private _pendingLoading: boolean = false;
  private _alreadyCreated: boolean = false;

  constructor(
    public loadingPageService: LoadingPageService,
    private _overlay: Overlay
  ) {}

  ngOnInit(): void {
    // when the component start to listen for changes
    this.loadingPageService.isLoading
      ?.asObservable()
      .subscribe((data: boolean) => {
        // if the subject has been called toggle the overlay.
        this.toggleOverlay(data);
      });
  }

  ngAfterViewInit(): void {
    this._viewInitialized = true;
    if (this._pendingLoading) {
      this.toggleOverlay(true);
    }
  }

  /**
   * Toggle the current overlay.
   * @param status boolean for determine the status of the overlay.
   */
  private toggleOverlay(status: boolean): void {
    if (!this._viewInitialized) {
      this._pendingLoading = true;
      return;
    }
    status ? this.createOverlay() : this.detachOverlay();
  }

  /**
   * Create a new overlay if there isnt already one.
   */
  private createOverlay(): void {
    if (!this._alreadyCreated) {
      this._alreadyCreated = true;
      this.overlayRef = this._overlay.create(
        new OverlayConfig({
          hasBackdrop: true,
        })
      );
      this.overlayRef.attach(this.portal);
    }
  }

  /**
   * Destroy the current overlay.
   */
  private detachOverlay(): void {
    this.overlayRef?.detach();
    this._alreadyCreated = false;
  }
}
