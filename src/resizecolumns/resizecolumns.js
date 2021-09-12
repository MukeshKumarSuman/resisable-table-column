import $ from 'jquery';

const MIN_WIDTH = 10;

class ResizeColumns {

    constructor(table) {
        this.draggables = [];
        this.$table = $(table.current);
        this.$tHead = this.$table.find('thead');
        this.$tBody = this.$table.find('tbody');
        this.$tFoot = this.$table.find('tfoot');
        this._bindCallbacks();
        this._init();
    }

    _bindCallbacks() {
        this._dragStop = this._dragStop.bind(this);
        this._dragStart = this._dragStart.bind(this);
        this._dragHelper = this._dragHelper.bind(this);
    }

    _init() {
        const $ths = this.$tHead.find('tr > th');
        const columnsLength = $ths.length;
        for (let i = 0; i < columnsLength; i++) {
            this._draggable(i, $($ths[i]));
        }
        this._activateDraggable();
    }

    /**
     *  Initialize a draggable element on a particular TH element
     *  @method  _draggable
     *  @param   int colIndex Column index
     *  @param   element nTh TH element
     *  @returns void
     *  @private
     */
    _draggable(colIndex, $nTh) {
        const $draggable = $('<div>');
        $draggable.addClass('draggable');
        // Ref if we want some data that letter can be used
        $draggable.data('colIndex', colIndex + 1);
        $nTh.append($draggable);
        this.draggables.push($draggable);
    }

    /**
     *  Activate the draggable on each TH element
     *  @method  _activateDraggable
     *  @returns void
     *  @private
     */
    _activateDraggable() {
        const dragConfig = {
            axis: 'x',
            stop: this._dragStop,
            start: this._dragStart,
            zIndex: 1000,
            helper: this._dragHelper,
            create: event => {
                event.preventDefault();
                event.stopPropagation();
            },
            containment: 'document'
        };

        while (this.draggables.length) {
            const $draggable = this.draggables.shift();
            $draggable.draggable(dragConfig);
        }
    }

    /**
     *  Add a draggable line on table
     *  @method  _dragHelper
     *  @returns {Object} A JQ drag element
     *  @private
     */
    _dragHelper() {
        const top = this.$table.offset().top;
        const height = this.$table.height();
        const $drag = $(
            `<div style="position:absolute; top: ${top}px; width:5px; height: ${height}px; border-right:1px solid black;"></div>`
        );
        return $drag.appendTo(document.body);
    }

    _dragStart() {}

    _dragStop(event, ui) {
        const $draggable = $(event.target);
        const startPosition = $draggable.data('ui-draggable').originalPosition.left;
        const stopPosition = ui.position.left;
        const move = stopPosition - startPosition;
        const $nTh = $draggable.parent();
        const width = Math.max(MIN_WIDTH, $nTh.outerWidth() + move);

        this._setWidthAndMaxWidth($nTh, width);

        const index = $draggable.data('colIndex');

        const $filterColumn = this.$tFoot.find(`tr th:nth-child(${index})`);
        const $filterInput = $filterColumn.find('input');
        if ($filterInput.length) {
            this._setWidthAndMaxWidth($filterInput, width);
        }
        this._setWidthOnTds(index, width);
    }

    _setWidthOnTds(index, width) {
        const $tds = this.$tBody.find(`tr td:nth-child(${index})`);
        for (let i = 0; i < $tds.length; i++) {
            this._setWidthAndMaxWidth($($tds[i]), width);
        }
    }

    _setWidthAndMaxWidth($ele, width) {
        $ele[0].style.maxWidth = `${width}px`;
        $ele.width(width);
    }

    _shouldEnableTooltip($ele) {
        return $ele[0].scrollWidth > $ele.innerWidth();
    }


    /**
     * Destroys resize column instance
     */
    destroy() {
        this.$table = null;
        this.draggables = null;
        this.$tHead = null;
        this.$tBody = null;
        this.$tFoot = null;
    }
}


export default ResizeColumns;

