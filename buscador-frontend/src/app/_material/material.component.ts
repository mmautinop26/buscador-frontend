import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatExpansionModule, MatSelectModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCheckboxModule, MatDividerModule, MatCardModule, MatGridListModule, MatChipsModule, MatPaginatorIntl, MatTooltipModule, MatDialogModule, MatRadioModule, MatSnackBarModule } from '@angular/material';
import { MatPaginatorImpl } from './mat-paginator';
@NgModule({

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule
   ],
  exports: [
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl}
  ],
})
export class MaterialModule {}
